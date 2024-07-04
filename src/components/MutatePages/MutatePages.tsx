import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { ApiPage, PageMutation } from '../../Types';

const initialState: PageMutation = {
    id: '',
    title: '',
    content: ''
};

const PageCategories = [
    { title: 'Home', id: 'home' },
    { title: 'About', id: 'about' },
    { title: 'Contacts', id: 'contacts' },
    { title: 'Joke', id: 'joke' },
    { title: 'Food recipes', id: 'food_recipes' }
];

const MutatePages: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [pageMutation, setPageMutation] = useState<PageMutation>(initialState);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPage = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const response = await axiosApi.get<ApiPage>(`/pages/${id}.json`);
            if (response.data) {
                setPageMutation({
                    id,
                    title: response.data.title,
                    content: response.data.content,
                });
            }
        } catch (error) {
            console.error('Error fetching page', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (id) {
            void fetchPage(id);
        } else {
            setPageMutation(initialState);
        }
    }, [id, fetchPage]);

    const onFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setPageMutation(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === 'id') {
            void fetchPage(value);
        }
    };

    const onFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const { title, content }
                = pageMutation;

            if (pageMutation.id) {
                await axiosApi.put(`/pages/${pageMutation.id}.json`, { title, content });
            } else {
                await axiosApi.post('/pages.json', { title, content });
            }

            navigate(`/pages/${pageMutation.id}`);
        } catch (e) {
            console.error('Error happened!', e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="edit-page bg-light p-3 text-start rounded">
            <h1>Edit Page</h1>
            <form className="editPageForm d-flex flex-column align-items-start justify-content-center"
                  onSubmit={onFormSubmit}>
                <label className="mb-2">Select Page:</label>
                <select
                    name="id"
                    required
                    className="AddSelectForm-input col-2 mb-3"
                    value={pageMutation.id}
                    onChange={onFieldChange}
                >
                    <option value="">Select a page</option>
                    {PageCategories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>
                <label className="mb-2">Title:</label>
                <input
                    type="text"
                    name="title"
                    required
                    className="AddSelectForm-input col-5 mb-3"
                    value={pageMutation.title}
                    onChange={onFieldChange}
                    placeholder="Title"
                />
                <label className="mb-2">Content:</label>
                <textarea
                    name="content"
                    required
                    className="AddSelectForm-input col-5 mb-3"
                    value={pageMutation.content}
                    onChange={onFieldChange}
                    placeholder="Content"
                />
                <button type="submit" disabled={isLoading}>
                    Save
                </button>
            </form>
        </div>
    );
};

export default MutatePages;
