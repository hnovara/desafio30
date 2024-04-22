import fs, { constants } from "node:fs";
import { Buffer } from "node:buffer";
import prompt from 'prompt-sync';
import colors from "colors";

const promptFunc = prompt();

const createFile = () => {
    const fileName = promptFunc(colors.blue("Ingrese el nombre del archivo a crear: "));
    const content = promptFunc(colors.blue("Ingrese el contenido del archivo: "));
    const dirName = `./files/${fileName}`;
    const buffer = Buffer.from(content);
    
    try {
        fs.writeFileSync(dirName, buffer);
        console.log(colors.green("El archivo se ha creado correctamente"));
    } catch (error) {
        console.log(colors.red("Lo sentimos, no hemos podido crear el archivo"));
    }
};

const readFile = () => {
    const fileName = promptFunc(colors.blue("Ingrese el nombre del archivo a leer: "));
    const dirName = `./files/${fileName}`;

    try {
        const file = fs.readFileSync(dirName);
        const data = file.toString();
        console.log(colors.green(data));
    } catch (error) {
        console.log(colors.red("Este archivo no se puede leer"));
    }
};

const updateFile = () => {
    const fileName = promptFunc(colors.blue("Ingrese el nombre del archivo a modificar: "));
    const content = promptFunc(colors.blue("Ingrese el nuevo contenido del archivo: "));
    const dirName = `./files/${fileName}`;
    const buffer = Buffer.from(content);
    
    try {
        fs.writeFileSync(dirName, buffer);
        console.log(colors.green("El archivo se ha modificado correctamente"));
    } catch (error) {
        console.log(colors.red("Lo sentimos, no hemos podido modificar el archivo"));
    }
};

const deleteFile = () => {
    const fileName = promptFunc(colors.blue("Ingrese el nombre del archivo a eliminar: "));
    const dirName = `./files/${fileName}`;

    try {
        fs.rmSync(dirName);
        console.log(colors.green("El archivo se ha eliminado correctamente"));
    } catch (error) {
        console.log(colors.red("Lo sentimos, no hemos podido eliminar el archivo"));
    }
};

export const fileController = () => {
    let action;
    do {
        action = promptFunc(colors.blue("Qué acción desea realizar? (Lectura: R, Edición: E, Creación: C, Eliminar: D, Salir: Q): "));
        action = action.toUpperCase(); 
    } while (!(action === "R" || action === "E" || action === "C" || action === "D" || action === "Q"));

    switch (action) {
        case "R":
            readFile();
            break;
        case "E":
            updateFile();
            break;
        case "C":
            createFile();
            break;
        case "D":
            deleteFile();
            break;
        case "Q":
            return;
        default:
            console.log(colors.red("Acción no válida"));
            break;
    }
};

const main = () => {
    fileController();
};

main();