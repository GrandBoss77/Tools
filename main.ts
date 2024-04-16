import { QMainWindow, QWidget, QLabel, QPushButton, QIcon, QBoxLayout, Direction, QLineEdit } from '@nodegui/nodegui';
import * as path from "node:path";
import sourceMapSupport from 'source-map-support';

sourceMapSupport.install();

function main(): void {
    const win = new QMainWindow();
    win.setWindowTitle("Dialogue creator");

    const centralWidget = new QWidget();

    const rootLayout = new QBoxLayout(Direction.TopToBottom);
    centralWidget.setObjectName("myroot");
    centralWidget.setLayout(rootLayout);

    const label = new QLabel();
    label.setObjectName("mylabel");
    label.setText("Hello");

    const textboxes: QLineEdit[] = []; // Array to store references to text boxes

    const buttonAddTextbox = new QPushButton();
    buttonAddTextbox.setText("Add dialogue");
    buttonAddTextbox.addEventListener('clicked', () => {
        const textBox = new QLineEdit();
        textBox.setPlaceholderText(`Dialogue ${textboxes.length + 1}`);
        textboxes.push(textBox); // Add textbox reference to the array
        rootLayout.addWidget(textBox); // Add textbox to the layout
    });

    const buttonSave = new QPushButton();
    buttonSave.setText("Save");
    buttonSave.addEventListener('clicked', () => {
        saveDialogues();
    });

    function saveDialogues() {
        const dialogues = textboxes.map(textBox => textBox.text()); // Retrieve text from each textbox
        console.log('Dialogues to save:', dialogues);
        const fileSystemObject = require('fs');
        const filePath = 'C:/Users/marko.kristic/Downloads/dialogues.txt';
        fileSystemObject.writeFileSync(filePath, dialogues.join('\n'));
        console.log('Dialogues saved to:', filePath);
    }

    const label2 = new QLabel();
    label2.setText("World");
    label2.setInlineStyle(`color: red;`);

    rootLayout.addWidget(label);
    rootLayout.addWidget(buttonAddTextbox);
    rootLayout.addWidget(buttonSave);
    rootLayout.addWidget(label2);
    win.setCentralWidget(centralWidget);
    win.setStyleSheet(
        `
        #myroot {
            background-color: #009688;
            height: '100%';
            align-items: 'center';
            justify-content: 'center';
        }
        #mylabel {
            font-size: 16px;
            font-weight: bold;
            padding: 1;
        }
        `
    );
    win.show();

    (global as any).win = win;
}
main();




