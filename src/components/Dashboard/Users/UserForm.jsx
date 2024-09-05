import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";

const UserForm = ({ form, isEditing, initialValues }) => {
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
        name="username"
        label="Username"
        rules={[{ required: true, message: "Please enter Username" }]}
      >
        <Input placeholder="Enter username" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please enter Email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input placeholder="Enter email" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: !isEditing, message: "Please enter Password" }]}
      >
        <Input.Password
          placeholder={
            isEditing
              ? "Leave blank to keep current password"
              : "Enter password"
          }
        />
      </Form.Item>
      <Form.Item
        name="roleName"
        label="Role"
        rules={[{ required: !isEditing, message: "Please select a Role" }]}
      >
        <Select placeholder="Select a role">
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="pharmacist">Pharmacist</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
