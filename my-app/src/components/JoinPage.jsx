import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const Modal = ({ isOpen, onClose, formData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-60" onClick={onClose}></div>
      <div className="relative bg-white bg-opacity-80 p-8 rounded-lg shadow-xl z-10 w-full max-w-md mx-4 sm:mx-8">
        <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Form Submitted</h3>
        <p className="text-gray-700 mb-4">The following students were selected:</p>
        <ul className="list-disc pl-5 mb-4 text-gray-600">
          {formData.students.filter(student => student.isChecked).map((student, index) => (
            <li key={index}><strong>{student.name}</strong></li>
          ))}
        </ul>
        <p className="text-gray-700 mb-4">Your attendance has been recorded.</p>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const JoinPage = () => {
  const [formData, setFormData] = useState({
    students: [
      { name: 'Student 1', isChecked: false },
      { name: 'Student 2', isChecked: false },
      { name: 'Student 3', isChecked: false },
      { name: 'Student 4', isChecked: false },
      { name: 'Student 5', isChecked: false },
      { name: 'Student 6', isChecked: false },
    ]
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // GSAP animation for the form entrance
    gsap.fromTo(
      '.join-page',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
    );
  }, []);

  const handleChange = (index) => {
    const updatedStudents = formData.students.map((student, i) => {
      if (i === index) {
        return { ...student, isChecked: !student.isChecked };
      }
      return student;
    });
    setFormData({ ...formData, students: updatedStudents });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Show the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      students: formData.students.map(student => ({ ...student, isChecked: false }))
    });
  };

  return (
    <div className="flex items-center justify-center  bg-no-repeat bg-center bg-cover" style={{ backgroundImage: 'url(/path-to-your-background-image.jpg)', backgroundSize: 'cover' }}>
      <div className={`relative top-[200px] w-full max-w-lg p-8 bg-opacity-20 shadow-lg rounded-lg backdrop-blur-md ${isModalOpen ? 'opacity-30' : 'opacity-100'} transition-opacity duration-300 transform -translate-y-20`}>
        <h2 className="text-3xl font-bold mb-8 text-center text-gradient bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 bg-clip-text text-transparent">
          Attendance
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {formData.students.map((student, index) => (
              <label key={index} className="flex items-center text-white">
                <input
                  type="checkbox"
                  checked={student.isChecked}
                  onChange={() => handleChange(index)}
                  className="mr-2 h-5 w-5 text-indigo-600 bg-transparent border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                />
                {student.name}
              </label>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 hover:from-yellow-500 hover:via-red-600 hover:to-pink-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} formData={formData} />
    </div>
  );
};

export default JoinPage;
