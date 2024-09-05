import React, { useEffect } from "react";
import { Form, Input } from "antd";

// Custom hook for phone number formatting
const usePhoneFormat = () => {
  return (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
      3,
      7
    )}-${phoneNumber.slice(7, 11)}`;
  };
};

// Custom hook for email formatting
const useEmailFormat = () => {
  return (value) => {
    if (!value) return value;
    return value.toLowerCase();
  };
};

const SupplierForm = ({ form, isEditing, initialValues }) => {
  const formatPhoneNumber = usePhoneFormat();
  const formatEmail = useEmailFormat();

  useEffect(() => {
    if (isEditing && initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [form, isEditing, initialValues]);

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter name" }]}
      >
        <Input placeholder="Enter name" />
      </Form.Item>
      <Form.Item
        name="contact_person"
        label="Contact Person"
        rules={[{ required: true, message: "Please enter Contact Person" }]}
      >
        <Input placeholder="Enter Contact Person" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please enter Email" },
          { type: "email", message: "Please enter a valid Email" },
        ]}
        normalize={formatEmail}
      >
        <Input placeholder="Enter Email" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          { required: true, message: "Please enter Phone Number" },
          {
            pattern: /^\d{3}-\d{4}-\d{4}$/,
            message: "Please enter a valid Phone Number",
          },
        ]}
        normalize={formatPhoneNumber}
      >
        <Input placeholder="Enter Phone Number (e.g., 021-555-1234)" />
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: "Please enter Address" }]}
      >
        <Input.TextArea placeholder="Enter Address" rows={4} />
      </Form.Item>
    </Form>
  );
};

export default SupplierForm;
