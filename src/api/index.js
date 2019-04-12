import Xhr from './axios/xhr';

export const createAuthorization = (data = {}) => Xhr.post('/TokenAuth/AuthenticateByVWorkTicket', data);



export const getHotelList = (city,start,end) => Xhr.get(`/api/services/app/Hotel/GetHotelsForBook?CityName=${city}&CheckInDate=${start}&CheckOutDate=${end}`);

export const getHotelRooms = (id,start,end) => Xhr.get(`/api/services/app/Hotel/GetHotelAndRooms?HotelId=${id}&CheckInDate=${start}&CheckOutDate=${end}`);


