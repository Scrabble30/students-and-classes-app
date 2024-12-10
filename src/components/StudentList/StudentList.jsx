import "./StudentList.css";

const StudentList = ({
    students,
    classes,
    handleEditStudent,
    handleDeleteStudentById,
}) => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Classes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.email}</td>
                            <td>
                                {student.classes &&
                                    classes
                                        .filter((clazz) => {
                                            return (
                                                student.classes.filter(
                                                    (studentClazz) =>
                                                        studentClazz == clazz.id
                                                ).length !== 0
                                            );
                                        })
                                        .map((clazz) => clazz.name)
                                        .join(", ")}
                            </td>
                            <td>
                                <button
                                    onClick={() => handleEditStudent(student)}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() =>
                                        handleDeleteStudentById(student.id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default StudentList;
