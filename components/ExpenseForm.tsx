import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { Expense, ExpenseNoId } from "../types";

type inputVals = {
  amount: string;
  date: string;
  description: string;
};

type Props = {
  submitButtonLabel: string;
  onCancel: () => void;
  onConfirm: (e: ExpenseNoId) => void;
  defaultValues?: Expense;
};

export default function ExpenseForm({
  submitButtonLabel,
  onCancel,
  onConfirm,
  defaultValues,
}: Props) {
  const [inputValues, setInputValues] = useState<inputVals>({
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
    description: defaultValues ? defaultValues.description : "",
  });

  function inputChangeHandler(inputIdentifier: string, e: string): void {
    setInputValues((curr) => {
      return {
        ...curr,
        [inputIdentifier]: e,
      };
    });
  }

  function confirmHandler(): void {
    const regex = /^20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    const rawDate = inputValues.date.trim();
    const dateObj = new Date(rawDate);
    const dateIsValid =
      regex.test(rawDate) &&
      !isNaN(dateObj.getTime()) &&
      dateObj.toISOString().slice(0, 10) === rawDate;

    const amountIsValid =
      !isNaN(+inputValues.amount) && +inputValues.amount > 0;
    const descIsValid = inputValues.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descIsValid) {
      Alert.alert("Invalid input", "Please check your input values");
      return;
    }
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    onConfirm(expenseData);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(null, "amount"),
            value: inputValues.amount,
            returnKeyType: "done",
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(null, "date"),
            value: inputValues.date,
            returnKeyType: "done",
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          value: inputValues.description,
          maxLength: 100,
          onChangeText: inputChangeHandler.bind(null, "description"),
        }}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} mode="normal" onPress={confirmHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
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
});
