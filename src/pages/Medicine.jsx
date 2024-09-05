import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, message, theme, Pagination } from "antd";
import {
  fetchMedicines,
  updateMedicine,
  deleteMedicine,
  addMedicine,
} from "../redux/actions/medicineActions";
import { useNavigate } from "react-router-dom";

//lazy load components
const ServerError = React.lazy(() => import("../config/ServerError"));
const MedicineForm = React.lazy(() =>
  import("../components/Dashboard/Medicine/MedicineForm")
);
const MedicineTable = React.lazy(() =>
  import("../components/Dashboard/Medicine/MedicineTable")
);

const Medicine = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { medicines, loading, currentPage, totalItems, error } = useSelector(
    (state) => state.medicine
  );
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchMedicines(page, pageSize));
  }, [dispatch, page]);

  if (error) {
    return <ServerError onRetry={() => dispatch(fetchMedicines())} />;
  }

  const showModal = (medicine = null) => {
    setEditingMedicine(medicine);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingMedicine) {
          const updatedValues = Object.keys(values).reduce((acc, key) => {
            if (values[key] !== undefined && values[key] !== "") {
              acc[key] = values[key];
            }
            return acc;
          }, {});
          dispatch(updateMedicine(editingMedicine.id, updatedValues))
            .then(() => {
              setIsModalOpen(false);
              form.resetFields();
              message.success("Medicine updated successfully");
              dispatch(fetchMedicines());
            })
            .catch((error) => {
              message.error(error.message || "Failed to update medicine");
            });
        } else {
          dispatch(addMedicine(values))
            .then(() => {
              setIsModalOpen(false);
              form.resetFields();
              message.success("Medicine added successfully");
              dispatch(fetchMedicines());
            })
            .catch((error) => {
              message.error(error.message || "Failed to add medicine");
            });
        }
      })
      .catch((info) => {
        message.error("Please fill in all required fields");
      });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this medicine?",
      onOk: () => {
        dispatch(deleteMedicine(id));
        message.success("Medicine deleted successfully");
      },
    });
  };

  const handleViewDetails = (medicineId) => {
    navigate(`/medicines/${medicineId}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const filteredMedicines = medicines.filter((medicine) => {
    if (!medicine || !medicine.id) return false;
    const name = medicine.name || "";
    const category = medicine.category || "";
    const description = medicine.description || "";
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase())
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
      <MedicineTable
        medicines={filteredMedicines}
        loading={loading}
        onAddMedicine={() => showModal()}
        onEditMedicine={(medicine) => showModal(medicine)}
        onDeleteMedicine={handleDelete}
        onViewDetails={handleViewDetails}
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />

      <Modal
        title={editingMedicine ? "Edit Medicine" : "New Medicine"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <MedicineForm
          form={form}
          isEditing={!!editingMedicine}
          initialValues={editingMedicine}
        />
      </Modal>
    </div>
  );
};

export default Medicine;
