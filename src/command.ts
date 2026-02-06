import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
    createNewNote,
    findNotes,
    getAllNotes,
    removeAllNotes,
    removeNotes,
} from "./notes.js";
import { listNotes } from "./utils.js";

yargs(hideBin(process.argv))
    .option("tags", {
        alias: "t",
        type: "string",
        desc: "tags to add to note",
    })
    .command(
        "new <note>",
        "Create a new note",
        (yargs) => {
            return yargs.positional("note", {
                type: "string",
                description: "The content of the note to create",
            });
        },
        async (argv) => {
            const tags = argv.tags ? argv.tags.split(",") : [];
            const note = await createNewNote(argv.note as string, tags);
            console.log("New note! ", note);
        },
    )
    .command(
        "all",
        "get all notes",
        () => {},
        async (argv) => {
            const notes = await getAllNotes();
            listNotes(notes);
        },
    )
    .command(
        "find <filter>",
        "get matching notes",
        (yargs) => {
            return yargs.positional("filter", {
                describe:
                    "The search term to filter note by, will be applied to note.content",
                type: "string",
            });
        },
        async (argv) => {
            const matches = await findNotes(argv.filter as string);
            listNotes(matches);
        },
    )
    .command(
        "remove <id>",
        "remove a note by id",
        (yargs) => {
            return yargs.positional("id", {
                description: "The id of the note you want to remove",
                type: "string",
            });
        },
        async (argv) => {
            await removeNotes(argv.id as string);
            console.log(`${argv.id}`);
        },
    )
    .command(
        "web [port]",
        "launch website to see notes",
        (yargs) => {
            return yargs.positional("port", {
                description: "port to bind on",
                default: 5000,
                type: "number",
            });
        },
        async (argv) => {},
    )
    .command(
        "clean",
        "remove all notes",
        () => {},
        async (argv) => {
            await removeAllNotes();
            console.log("db reset");
        },
    )
    .demandCommand()
    .parse();
