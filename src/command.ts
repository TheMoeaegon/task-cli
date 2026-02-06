import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
    .command(
        "new <note>",
        "Create a new note",
        (yargs) => {
            return yargs.positional("note", {
                type: "string",
                description: "The content of the note to create",
            });
        },
        (argv) => {},
    )
    .command(
        "all",
        "get all notes",
        () => {},
        (argv) => {},
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
        (argv) => {},
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
        (argv) => {},
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
        (argv) => {},
    )
    .command(
        "clean",
        "remove all notes",
        () => {},
        (argv) => {},
    )
    .option("tags", {
        alias: "t",
        type: "string",
        desc: "tags to add to note",
    })
    .demandCommand()
    .parse();
