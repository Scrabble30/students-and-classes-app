import { useEffect, useState } from "react";
import StudentList from "./components/StudentList/StudentList";
import PersonForm from "./components/StudentForm";
import "./App.css";

const blankStudent = {
    id: "",
    name: "",
    age: "",
    email: "",
};

function App() {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);

    const [formStudent, setFormStudent] = useState({ ...blankStudent });

    useEffect(() => {
        handleGetStudents();

        fetch("http://localhost:3000/classes")
            .then((response) => response.json())
            .then((data) => setClasses(data))
            .catch((err) => console.error(err));
    }, []);

    const handleSaveStudent = (student) => {
        fetch("http://localhost:3000/students/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(student),
        })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    setFormStudent({ ...blankStudent });
                    handleGetStudents();
                }
            })
            .catch((err) => console.error(err));
    };

    const handleGetStudents = () => {
        fetch("http://localhost:3000/students")
            .then((response) => response.json())
            .then((data) => setStudents(data))
            .catch((err) => console.error(err));
    };

    const handleEditStudent = (student) => {
        setFormStudent(student);
    };

    const handleUpdateStudent = (student) => {
        fetch(`http://localhost:3000/students/${student.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(student),
        })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    setFormStudent({ ...blankStudent });
                    handleGetStudents();
                }
            })
            .catch((err) => console.error(err));
    };

    const handleDeleteStudentById = (studentId) => {
        fetch(`http://localhost:3000/students/${studentId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.status >= 200 && response.status < 300)
                    handleGetStudents();
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <StudentList
                students={students}
                classes={classes}
                handleEditStudent={handleEditStudent}
                handleDeleteStudentById={handleDeleteStudentById}
            />
            <br />
            <PersonForm
                classes={classes}
                formStudent={formStudent}
                setFormStudent={setFormStudent}
                handleSaveStudent={handleSaveStudent}
                handleUpdateStudent={handleUpdateStudent}
            />
        </>
    );
}

export default App;
