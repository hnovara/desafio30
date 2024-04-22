import fs, { constants } from "node:fs";
import { Buffer } from "node:buffer";
import prompt from "prompt-sync";

import colors from "colors";


const promptFunc = prompt();

const createFile = (fileName, content) => {
    const dirName = `./files/${fileName}`;
    const buffer = Buffer.from(content);
    
    fs.writeFileSync(dirName, buffer, error => {
        if (error) {
            console.log(colors.red("Lo sentimos, no hemos podido crear el archivo"));
        } else {
            console.log(colors.green("El archivo se ha creado correctamente"));
        }
    });
};

const readFile = (fileName) => {
    const dirName = `./files/${fileName}`;

    fs.access(dirName, constants.R_OK, error => {
        if (error) {
            console.log(colors.red("Este archivo no se puede leer"));
        } else {
            const file = fs.readFileSync(dirName);
            const data = file.toString();
            console.log(colors.green(data));
        }
    });
};

const updateFile = (fileName, content) => {
    const dirName = `./files/${fileName}`;
    const buffer = Buffer.from(content);
    
    fs.access(dirName, constants.R_OK | constants.W_OK, error => {
        if (error) {
            console.log(colors.red("Este archivo no se puede leer y/o no se puede escribir"));
        } else {
            fs.writeFileSync(dirName, buffer, error => {
                if (error) {
                    console.log(colors.red("Lo sentimos, no hemos podido modificar el archivo"));
                } else {
                    console.log(colors.green("El archivo se ha modificado correctamente"));
                }
            });
        }
    });
};

const deleteFile = (fileName) => {
    const dirName = `./files/${fileName}`;

    fs.rm(dirName, error => {
        if (error) {
            console.log(colors.red("Lo sentimos, no hemos podido eliminar el archivo"));
        } else {
            console.log(colors.green("El archivo se ha eliminado correctamente"));
        }
    });
};

const processCommand = (action, fileName, content) => {
    switch (action) {
        case "C":
            createFile(fileName, content);
            break;
        case "R":
            readFile(fileName);
            break;
        case "U":
            updateFile(fileName, content);
            break;
        case "D":
            deleteFile(fileName);
            break;
        default:
            console.log(colors.red("Acción no válida"));
            break;
    }
};

const main = () => {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.log(colors.red("Se requieren al menos dos argumentos: acción y nombre del archivo"));
        return;
    }

    const action = args[0].toUpperCase();
    const fileName = args[1];
    const content = args[2] || "";

    processCommand(action, fileName, content);
};

main();