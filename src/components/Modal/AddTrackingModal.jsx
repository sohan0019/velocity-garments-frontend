import ReactDOM from 'react-dom';

const AddTrackingModal = ({ isOpen, closeModal, trackingId, handleUpdate, currentStatus }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <form onSubmit={handleUpdate}>
          <h3 className="text-lg font-bold mb-4">Update Tracking for {trackingId}</h3>

          <label className="block text-sm font-medium">Status</label>
          <select name="status" className="border p-2 w-full my-2 rounded" defaultValue={currentStatus || "Cutting Completed"}>
            <option value="Cutting Completed">Cutting Completed</option>
            <option value="Sewing Started">Sewing Started</option>
            <option value="Finishing">Finishing</option>
            <option value="QC Checked">QC Checked</option>
            <option value="Packed">Packed</option>
            <option value="Shipped">Shipped</option>
          </select>

          <label className="block text-sm font-medium">Location</label>
          <input name="location" required placeholder="Current Location" className="border p-2 w-full my-2 rounded" />

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save Update</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddTrackingModal;