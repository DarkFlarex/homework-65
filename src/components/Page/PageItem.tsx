import React, { useCallback, useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import { Page } from "../../Types";
import Spinner from "../Spinner/Spinner";

const PageItem: React.FC = () => {
    const [pages, setPages] = useState<Page | null>(null);
    const [loading, setLoading] = useState(true);
    const { pageName } = useParams();

    const fetchPage = useCallback(async (pageName:string) => {
        try {
            setLoading(true);
            const response = await axiosApi.get<Page | null>(`/pages/${pageName}.json`);
            if (response.data) {
                setPages(response.data);
            }
        } catch (error) {
            console.error('Error fetching pages', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (pageName !== undefined )  {
            void fetchPage(pageName);
        }
    }, [pageName, fetchPage]);

    return (
        <>
            {loading ? (<Spinner />
            ) : (
                pages ? (
                    <div className="card">
                        <h4>{pages.title}</h4>
                        <p>{pages.content}</p>
                    </div>
                ) : (
                    <h1>Страница с заголовком "{pageName}" не найдена</h1>
                )
            )}
        </>
    );
};

export default PageItem;
