// script.js

// Mock teacher credentials and classrooms from your database (to be replaced with API calls)
const mockTeachers = [
  { teacherId: 1, name: 'Alice Johnson', credentials: 'hashed_password_1' },
  { teacherId: 2, name: 'Bob Smith', credentials: 'hashed_password_2' }
];

const classrooms = [
  { classroomId: 1, type: 'Primary', faults: 'Broken projector', available: true },
  { classroomId: 2, type: 'Primary', faults: null, available: true },
  { classroomId: 3, type: 'Secondary', faults: 'Leaky ceiling', available: true },
  { classroomId: 4, type: 'Secondary', faults: null, available: false }
];

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const teacherId = parseInt(document.getElementById('teacherId').value);
  const password = document.getElementById('password').value;

  // Simulate teacher login validation
  const teacher = mockTeachers.find(t => t.teacherId === teacherId && t.credentials === password);

  if (teacher) {
      document.getElementById('login-section').style.display = 'none';
      document.getElementById('classroom-section').style.display = 'block';

      // Populate classrooms in the dropdown
      const classroomSelect = document.getElementById('classroom');
      classrooms.forEach(classroom => {
          if (classroom.available) {
              const option = document.createElement('option');
              option.value = classroom.classroomId;
              option.text = `${classroom.type} Classroom ${classroom.classroomId}`;
              classroomSelect.add(option);
          }
      });
  } else {
      alert("Invalid Teacher ID or Password");
  }
});

// Handle classroom booking request
document.getElementById('classroomForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const classroomId = parseInt(document.getElementById('classroom').value);
  const timeSlot = document.getElementById('timeSlot').value;

  const classroom = classrooms.find(c => c.classroomId === classroomId);
  const responseMessage = document.getElementById('responseMessage');

  if (classroom.type === 'Primary') {
      // Simulate HOD approval process
      const isApproved = Math.random() > 0.5; // Random approval simulation

      if (isApproved) {
          responseMessage.textContent = `Booking for Primary Classroom ${classroomId} is approved for ${timeSlot}.`;
      } else {
          responseMessage.textContent = 'HOD rejected the request. Please choose another classroom or time slot.';
      }
  } else {
      // Secondary classrooms are booked without approval
      responseMessage.textContent = `Secondary Classroom ${classroomId} booked for ${timeSlot}. Faults: ${classroom.faults || 'None'}.`;
  }

  // Show response section
  document.getElementById('response-section').style.display = 'block';
});

