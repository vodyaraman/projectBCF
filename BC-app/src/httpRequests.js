import HttpClient from './httpClientAxios';

class DatabaseClient {
    constructor() {
        this.httpClient = new HttpClient('http://saevskii.space:3001');
    }

    async submitData(code) {
        try {
            const response = await this.httpClient.post('/users/submitData', { code });
            return response.user;
        } catch (error) {
            console.error('Error submitting data:', error);
            throw error;
        }
    }

    async addUser(login, password, email) {
        try {
            const response = await this.httpClient.post('/users/addUser', { login, password, email });
            return response;
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    }

    async updateArticle(id, title, content) {
        try {
            await this.httpClient.put(`/articles/updateArticle/${id}`, { title, content });
        } catch (error) {
            console.error('Error updating article:', error);
            throw error;
        }
    }

    async deleteArticle(id) {
        try {
            await this.httpClient.delete(`/articles/deleteArticle/${id}`);
        } catch (error) {
            console.error('Error deleting article:', error);
            throw error;
        }
    }

    async getUserByID(userid) {
        try {
            const response = await this.httpClient.post('/users/getUserByID', { userid });
            return response.login;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }

    async getImage(filename) {
        try {
            const response = await this.httpClient.getBlob(`/files/images/${filename}`);
            return response;
        } catch (error) {
            console.error('Error fetching image:', error);
            throw error;
        }
    }

    async addReview(rating, reviewText, userId) {
        try {
            const response = await this.httpClient.post('/reviews/addReview', {
                rating: rating,
                review_text: reviewText,
                user_id: userId
            });
            console.log('Review added successfully:', response.data);
            return response;
        } catch (error) {
            console.error('Error adding review:', error);
            throw error;
        }
    }
    async getAllReviews() {
        try {
            const response = await this.httpClient.get('/reviews/getReviews');
            return response;
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw error;
        }
    }

    async getAllSections() {
        try {
            const response = await this.httpClient.get('/articles/getSections');
            return response;
        } catch (error) {
            console.error('Error fetching sections', error)
            throw error;
        }
    }

    async getArticlesBySection(id){
        try {
            const response = await this.httpClient.post(`/articles/getArticlesBySection`, {
                section_id: id
            });
            return response;
        } catch (error) {
            console.error('Error fetching articles by theirs section', error)
            throw error;
        }
    }
}

export default DatabaseClient;