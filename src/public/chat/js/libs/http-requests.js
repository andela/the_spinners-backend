const messageContainer = document.getElementById('message-container');

export const saveMessages = async (API, token, data) => {
  const response = await fetch(API, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });

  const result = await response.json(); 

  return result;
};

export const getAllUsers = async (API, token) => {
  const response = await fetch(API, {
    method: 'GET', 
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });

  const result = await response.json();

  return result;
};
