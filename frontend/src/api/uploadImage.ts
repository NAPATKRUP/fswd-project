import axios, { AxiosResponse } from 'axios';
import { IImageUpload } from '../components/commons/type/IImageUpload';

const api = axios.create({
  baseURL: process.env.API_URI || 'http://localhost:3001',
});

const uploadImage: (file: File) => Promise<AxiosResponse<IImageUpload>> = (file: File) => {
  let data = new FormData();
  data.append('image', file);
  return api.post<IImageUpload>('/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default uploadImage;
