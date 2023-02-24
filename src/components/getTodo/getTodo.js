export const getTodo = ({ id, value, checked }) => `
  <li data-id=${id}>
    <input type="checkbox" data-action="checkbox" ${checked ? 'checked' : ''} />
    <span>${value}</span>
    <button data-action="delete">x</button>
    <button data-action="view">view</button>
  </li>`;
