import "./BookList.css";

import React, {
    useEffect,
    useState,
} from "react";

import axios from "axios";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            fetchBooks(); // Fetch books if already logged in
        }
    }, []);

    useEffect(() => {
        const results = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBooks(results);
        setCurrentPage(1);
    }, [searchTerm, books]);

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true);
            fetchBooks(); // Fetch books after login
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error.message);
        }
    };

    const fetchBooks = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:8000/api/books', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBooks(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Unauthorized access. Please log in.");
                localStorage.removeItem('token'); // Clear token if unauthorized
                setIsLoggedIn(false); // Update logged in status
            } else {
                console.error("Error fetching books:", error);
            }
            setBooks([]);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setBooks([]);
    };

    const addBook = async () => {
        const token = localStorage.getItem('token');
        try {
            const bookData = { title, author, description };
            await axios.post('http://localhost:8000/api/books', bookData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchBooks();
            resetForm();
        } catch (error) {
            console.error("Error adding book:", error.response ? error.response.data : error.message);
        }
    };

    const updateBook = async () => {
        const token = localStorage.getItem('token');
        try {
            const bookData = { title, author, description };
            await axios.put(`http://localhost:8000/api/books/${editingId}`, bookData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchBooks();
            resetForm();
        } catch (error) {
            console.error("Error updating book:", error.response ? error.response.data : error.message);
        }
    };

    const deleteBook = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8000/api/books/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchBooks();
        } catch (error) {
            console.error("Error deleting book:", error.response ? error.response.data : error.message);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setTitle('');
        setAuthor('');
        setDescription('');
    };

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Sorting Logic
    const sortedBooks = [...filteredBooks].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const startEditing = (book) => {
        setEditingId(book.id);
        setTitle(book.title);
        setAuthor(book.author);
        setDescription(book.description);
    };

    return (
        <div className="book-list-container">
            <h1>Book List</h1>
            {!isLoggedIn ? (
                <>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={login}>Login</button>
                </>
            ) : (
                <>
                    <button onClick={logout}>Logout</button>
                    <input
                        type="text"
                        placeholder="Search by Title or Author"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <button onClick={editingId ? updateBook : addBook}>
                        {editingId ? 'Update Book' : 'Add Book'}
                    </button>
                    <button onClick={resetForm}>Cancel</button>

                    <table className="book-table">
                        <thead>
                            <tr>
                                <th onClick={() => requestSort('title')}>Title</th>
                                <th onClick={() => requestSort('author')}>Author</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentBooks.map(book => (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.description}</td>
                                    <td>
                                        <button onClick={() => startEditing(book)}>Edit</button>
                                        <button onClick={() => deleteBook(book.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default BookList;
