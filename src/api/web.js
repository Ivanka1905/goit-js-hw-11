import axios from "axios";
import Notiflix from "notiflix";

export const itemsPerPage = 40;
const searchParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: itemsPerPage,
});

export const BASE_URL = `https://pixabay.com/api/?key=30167206-9cd8436e9cf02f01e1d7e25e7&q=${searchParams}`;
export async function getPhoto(search, page) {
    try {
        const response = await axios.get(`${BASE_URL}&page=${page}&q=${search}`);
        if (!search) {
            throw new Error(error);
        }
        return response.data;
    } catch (error) {
        Notiflix.Notify.failure(error.message);
    }
}