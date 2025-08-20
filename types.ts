import { NavigatorScreenParams } from "@react-navigation/native";

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

export type stackNavParams = {
  ExpensesOverview: NavigatorScreenParams<bottomTabsNavParams>;
  ManageExpense: undefined;
};

export type bottomTabsNavParams = {
  RecentExpenses: undefined;
  AllExpenses: undefined;
};
