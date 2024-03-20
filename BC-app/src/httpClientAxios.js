import axios from 'axios';

class HttpClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async get(url) {
        try {
            const response = await axios.get(`${ this.baseURL }${ url }`);
            return response.data;
        } catch (error) {
            console.error('Error performing GET request:', error);
            throw error;
        }
    }

    async getBlob(url) {
        try {
            const response = await axios.get(`${ this.baseURL }${ url }`, {
                responseType: "blob",
            });
            return URL.createObjectURL(response.data);
        } catch (error) {
            console.error('Error performing GET request:', error);
            throw error;
        }
    }

    async post(url, data) {
        try {
            const response = await axios.post(`${ this.baseURL }${ url }`, data);
            return response.data;
        } catch (error) {
            console.error('Error performing POST request:', error);
            throw error;
        }
    }

    async put(url, data) {
        try {
            const response = await axios.put(`${ this.baseURL }${ url }`, data);
            return response.data;
        } catch (error) {
            console.error('Error performing PUT request:', error);
            throw error;
        }
    }

    async delete(url) {
        try {
            const response = await axios.delete(`${ this.baseURL }${ url }`);
            return response.data;
        } catch (error) {
            console.error('Error performing DELETE request:', error);
            throw error;
        }
    }
}

export default HttpClient;