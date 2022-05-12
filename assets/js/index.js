import { TarefaController } from './controllers/TarefaController.js'

let tarefaController = new TarefaController();

let dialog = document.querySelector('#dialog');

document.getElementById('button-add').addEventListener('click', () => tarefaController.openDialog());

let obeserver = new MutationObserver(mutations =>
    mutations.forEach(
        mutation => {
            if (dialog.classList.contains('modal')) {

                document.querySelectorAll('.close')
                    .forEach(c => c.addEventListener(
                        'click', () => tarefaController.closeDialog())
                    );

                document.querySelector('.salvar').addEventListener(
                    'click', () => tarefaController.adicionaTarefa()
                )
            }

            if (dialog.classList.contains('toast')) {

                document.querySelector('.close').addEventListener(
                        'click', () => tarefaController.closeDialog()
                    );
            }
        }
    ));

let config = { childList: true };

obeserver.observe(dialog, config);
