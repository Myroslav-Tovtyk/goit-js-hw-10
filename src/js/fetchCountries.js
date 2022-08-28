
const BASE = 'https://restcountries.com/v2/';

const END_POINT = 'name/';

export default function fetchCountries(name) {
    return fetch(`${BASE}${END_POINT}${name}?fields=name,capital,population,flags,languages`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.status);
            };
         return resp.json()
});
};
 
