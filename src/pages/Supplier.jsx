import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, message, theme } from "antd";
import { useNavigate } from "react-router-dom";
import {
  addSupplier,
  deleteSupplier,
  fetchSuppliers,
  updateSupplier,
} from "../redux/actions/supplierActions";

//lazy load components
const SupplierTable = React.lazy(() =>
  import("../components/Dashboard/Supplier/SupplierTable")
);
const SupplierForm = React.lazy(() =>
  import("../components/Dashboard/Supplier/SupplierForm")
);
const ServerError = React.lazy(() => import("../config/ServerError"));

const Suppliers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { suppliers, loading, currentPage, totalItems, error } = useSelector(
    (state) => state.supplier
  );
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchSuppliers(page, pageSize));
  }, [dispatch, page]);

  if (error) {
    return <ServerError onRetry={() => dispatch(fetchSuppliers())} />;
  }

  const showModal = (supplier = null) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingSupplier) {
          const updatedValues = Object.keys(values).reduce((acc, key) => {
            if (values[key] !== undefined && values[key] !== "") {
              acc[key] = values[key];
            }
            return acc;
          }, {});
          dispatch(updateSupplier(editingSupplier.id, updatedValues))
            .then(() => {
              setIsModalOpen(false);
              form.resetFields();
              message.success("Supplier updated successfully");
              dispatch(fetchSuppliers());
            })
            .catch((error) => {
              message.error(error.message || "Failed to update supplier");
            });
        } else {
          dispatch(addSupplier(values))
            .then(() => {
              setIsModalOpen(false);
              form.resetFields();
              message.success("Supplier added successfully");
              dispatch(fetchSuppliers());
            })
            .catch((error) => {
              message.error(error.message || "Failed to add supplier");
            });
        }
      })
      .catch((info) => {
        message.error("Please fill in all required fields");
      });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this supplier?",
      onOk: () => {
        dispatch(deleteSupplier(id));
        message.success("Supplier deleted successfully");
      },
    });
  };

  const handleViewDetails = (supplierId) => {
    navigate(`/suppliers/${supplierId}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const filteredSuppliers = suppliers.filter((supplier) => {
    if (!supplier || !supplier.id) return false;
    const name = supplier.name || "";
    const email = supplier.email || "";
    const contact_person = supplier.contact_person || "";
    const address = supplier.address || "";
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact_person.toLowerCase().includes(searchQuery.toLowerCase()) ||
      address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div
      style={{
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <SupplierTable
        suppliers={filteredSuppliers}
        loading={loading}
        onAddSupplier={() => showModal()}
        onEditSupplier={(supplier) => showModal(supplier)}
        onDeleteSupplier={handleDelete}
        onViewDetails={handleViewDetails}
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />

      <Modal
        title={editingSupplier ? "Edit Supplier" : "New Supplier"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <SupplierForm
          form={form}
          isEditing={!!editingSupplier}
          initialValues={editingSupplier}
        />
      </Modal>
    </div>
  );
};

export default Suppliers;
