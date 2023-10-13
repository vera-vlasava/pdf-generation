/* eslint-disable default-case */
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import test from "./test.json";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "tomato",
  },
  section: {
    flexDirection: "row",
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "gray",
  },
});

// Create Document Component
function PDFFile() {
  const [document, setDocument] = useState({});

  useEffect(() => {
    setDocument(test);
  }, []);

  const docName = document?.displayName;
  const fields = document?.clientPages?.reduce((prev, current) => {
    return [...prev, ...current.fields];
  }, []);

  function renderElements(element) {
    switch (element.type) {
      case "text":
      case "date":
      case "number":
      case "time": {
        return renderTextField(element.label || "", element.key);
      }

      case "radio": {
        if (!element.choices) {
          throw new Error("Radio: no choices provided");
        }
        return renderRadioOrSelect(
          element.choices,
          element.label || "",
          element.key
        );
      }

      case "checkbox": {
        if (!element.items) {
          throw new Error("Checkbox: no items provided");
        }
        return renderCheckbox(element.items, element.label || "", element.key);
      }
    }
  }

  function renderTextField(label, key) {
    return (
      <View style={styles.section}>
        <Text>{label}</Text>
        <Text>{key}</Text>
      </View>
    );
  }

  function renderRadioOrSelect(choices, label, key) {
    return (
      <View style={styles.section}>
        <Text>{label}</Text>
        <Text>{key}</Text>
      </View>
    );
  }

  function renderCheckbox(items, label, key) {
    return (
      <View style={styles.section}>
        <Text>{label}</Text>
        <Text>{key}</Text>
      </View>
    );
  }

  const renderPage = () => {
    return fields?.map((element?) => (
      <View key={element.key} style={styles.section}>
        {renderElements(element)}
      </View>
    ));
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text>{docName}</Text>
        {renderPage()}
      </Page>
    </Document>
  );
}

export default PDFFile;
