import { createContext, ReactNode, useEffect, useReducer } from "react";
import { Expense } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DUMMYEX: Expense[] = [
  {
    id: "e1",
    description: "a pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "tv",
    amount: 109.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e3",
    description: "ps5",
    amount: 499.99,
    date: new Date("2021-11-19"),
  },
  {
    id: "e4",
    description: "food",
    amount: 59.99,
    date: new Date("2025-8-12"),
  },
];

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expenseData: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expenseData: Omit<Expense, "id">) => void;
};

type ProviderProps = { children: ReactNode };

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

function expensesReducer(state: Expense[], action: any): Expense[] {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "SET": // when loading from storage
      return action.payload;
    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }: ProviderProps) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMYEX);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const stored = await AsyncStorage.getItem("expenses");
        if (stored) {
          const parsed: Expense[] = JSON.parse(stored);

          const restored = parsed.map((exp) => ({
            ...exp,
            date: new Date(exp.date),
          }));
          dispatch({ type: "SET", payload: restored });
        }
      } catch (err) {
        console.error("Failed to load expenses:", err);
      }
    };
    loadExpenses();
  }, []);

  useEffect(() => {
    const saveExpenses = async () => {
      try {
        await AsyncStorage.setItem("expenses", JSON.stringify(expensesState));
      } catch (err) {
        console.error("Failed to save expenses:", err);
      }
    };
    saveExpenses();
  }, [expensesState]);

  function addExpense(expenseData: Omit<Expense, "id">) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id: string) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id: string, expenseData: Omit<Expense, "id">) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }
  const value: ExpensesContextType = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
