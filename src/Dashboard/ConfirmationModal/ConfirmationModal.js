import React from 'react';

const ConfirmationModal = ({ message, CloseModal, successModal, data }) => {
    return (
        <div>
            {/* The button to open modal */}


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="ConfirmModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-error">{message} ??</h3>
                    <p className="py-4 text-error">It doesn't Recover if you delete it once</p>
                    <div className="modal-action">
                        <label htmlFor="ConfirmModal" className="btn btn-outline" onClick={() => successModal(data)}>Yes</label>
                        <label htmlFor="ConfirmModal" className="btn btn-outline" onClick={CloseModal}>Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;