const prefss = {
    "walls": {
        root:[ "."]
    },
    "walls-1": {
        root: ["./cold", "./manga", "./abstract", "./wave", "./poly", "./m-26.jp", "./chillop", "./minimal", "./digital", "./pixel", "./aerial", "./outrun", "./painting", "./mountain", "./anime", "./retro", "./spam"]
    },
    "walls-2": {
        root: [
            './Anime_Art',  './Art',
            './Background', './Cityscapes',        './Fantasy',
            './Future',     './Landscapes',
            './Nature',     './Spacescapes',
            './Tech',       './Unsorted',
            './Vibrant',    './digitalArt',
            './dithered',   './minimalistic',
            './nordic',     './nordish',
            './random',     './sky'
          ]
    },
    "catppuccin_walls": {
        root: ["./wallpapers_png"]
    }
}
const path = require("path");
const fs = require("fs");
if(!fs.existsSync("./all_walls")) fs.mkdirSync("./all_walls");

for (const [name, prefs] of Object.entries(prefss)) {
    if(!fs.existsSync(`./walls/${name}`)) {
     console.log(`Skipped ${name} because it doesn't exist`);
        continue; // repo was not pulled ig
    }
    const roots = prefs.root.map(x=> path.join(__dirname, 'walls', name, x))
    for (const root of roots) {
        // lmao just exec mv * 
        // require('child_process').execSync(`cp ${root}/* ./all_walls/`);
        const files = walk(root);
        for (const file of files) {
            require('child_process').execSync(`cp "${file}" ./all_walls/`);
            // fs.renameSync(file, new_path);
        }
        console.log(`moved ${root} to ./all_walls`);
    }
    

}

function walk(dirPath, fileList = []) {
    const files = fs.readdirSync(dirPath); // Read all files and directories in the current directory
  
    files.forEach(file => {
      const fullPath = path.join(dirPath, file); // Get the full path of the file/directory
  
      // Check if it's a directory or a file
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        // If it's a directory, recurse into it
        walk(fullPath, fileList);
      } else {
        // If it's a file, add it to the fileList
        fileList.push(fullPath);
      }
    });
  
    return fileList;
  }

// console.log(walk("./walls"))
