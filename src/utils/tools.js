

export const saveData = (dataOBJ) => {
  sessionStorage.setItem('hotelData',JSON.stringify(dataOBJ))
}

export const getData = () => {
  return JSON.parse(sessionStorage.getItem('hotelData'));
}

export const deleteData = () => {
  sessionStorage.removeItem('hotelData');
}
