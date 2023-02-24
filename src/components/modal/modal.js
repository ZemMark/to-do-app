import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export const tasksModal = basicLightbox.create(`
    <div class="modal">
        <p class="modal-text">
            ${id}
        </p>
        <button class="modal-button" id="close-modal" type="button">ok</button>
    </div>
`);
