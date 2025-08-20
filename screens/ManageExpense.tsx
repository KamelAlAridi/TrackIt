import { View, StyleSheet } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackNavParams } from "../types";
import IconButton from "../components/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/Button";
import { ExpensesContext } from "../store/expenses-context";

type Props = NativeStackScreenProps<stackNavParams, "ManageExpense">;

export default function ManageExpense({ route, navigation }: Props) {
  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler(): void {
    if (isEditing) expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }
  function cancelHandler(): void {
    navigation.goBack();
  }
  function confirmHandler(): void {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, {
        description: "Test!!!!!!",
        amount: 29.99,
        date: new Date(),
      });
    } else {
      expensesCtx.addExpense({
        description: "Test",
        amount: 19.99,
        date: new Date(),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} mode="normal" onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
