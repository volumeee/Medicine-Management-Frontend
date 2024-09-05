import React, { useEffect, useState, useRef } from "react";
import { Form, Input, InputNumber, DatePicker, Select, Row, Col } from "antd";
import dayjs from "dayjs";
import { categoryOptions } from "./MedicineCategoryDummy";

const { Option } = Select;

const MedicineForm = ({ form, isEditing, initialValues }) => {
  const [filteredOptions, setFilteredOptions] = useState(categoryOptions);
  const [searchValue, setSearchValue] = useState("");
  const selectRef = useRef(null);

  useEffect(() => {
    if (isEditing && initialValues) {
      form.setFieldsValue({
        ...initialValues,
        expiry_date: initialValues.expiry_date
          ? dayjs(initialValues.expiry_date)
          : undefined,
      });
    } else {
      form.resetFields();
    }
  }, [form, isEditing, initialValues]);

  const handleSearch = (value) => {
    setSearchValue(value);
    const lowerValue = value.toLowerCase();

    const filtered = categoryOptions
      .filter((option) => option.label.toLowerCase().includes(lowerValue))
      .sort((a, b) => {
        const aStartsWith = a.label.toLowerCase().startsWith(lowerValue);
        const bStartsWith = b.label.toLowerCase().startsWith(lowerValue);
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        return a.label.localeCompare(b.label);
      });

    setFilteredOptions(filtered);

    if (selectRef.current) {
      selectRef.current.scrollTo({ top: 0 });
      selectRef.current.focus();
    }
  };

  const highlightSearch = (text) => {
    if (!searchValue) return text;
    const regex = new RegExp(`(${searchValue})`, "gi");
    return text
      .split(regex)
      .map((part, index) =>
        regex.test(part) ? <mark key={index}>{part}</mark> : part
      );
  };

  return (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea placeholder="Enter description" rows={1} />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              showSearch
              placeholder="Select a category"
              optionFilterProp="children"
              onSearch={handleSearch}
              filterOption={false}
              ref={selectRef}
              listHeight={200}
              defaultActiveFirstOption={true}
            >
              {filteredOptions.map((option, index) => (
                <Option key={`${option.value}-${index}`} value={option.value}>
                  {highlightSearch(option.label)}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="stock_quantity"
            label="Stock Quantity"
            rules={[{ required: true, message: "Please enter stock quantity" }]}
          >
            <InputNumber
              min={0}
              placeholder="Enter stock quantity"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="expiry_date"
            label="Expiry Date"
            rules={[{ required: true, message: "Please select expiry date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <InputNumber
              min={0}
              step={0.01}
              placeholder="Enter price"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default MedicineForm;
