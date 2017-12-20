export const getAllAgriculture = () =>
  fetch('https://young-everglades-14913.herokuapp.com/agriculture/Beef%20Cattle')
  .then(data => data.json())
