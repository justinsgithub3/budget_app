import path from 'path';
import { fileURLToPath } from 'url'; 
// Get the current filename and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const getLevel1 = async (req, res, next) => {    
    try {
        res.status(200).sendFile(path.join(__dirname, '..', 'public', 'views', 'level1.html'));
    }
    catch (e) {
        // server error
        console.log("Error: ", e)
        res.status(500).json({ error : e.message || 'Internal server error' });
    }
};



/*
// From last project:
//import {getItem, getAllItems, createItem, updateItem, deleteItem } from '../database/queries.js';

// get single post
export const getPost = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const posts = await getItem(id);
        res.status(200).json(posts);
    } catch (e) {
        return res
            .status(404)
            .json({ msg: `A post with id of ${id} was not found.` })
    }
};

// create single post
export const createPost = async (req, res, next) => {

    // breaks the json string of {id: title} to their own variables
    let id, title;

    for (const [key, value] of Object.entries(req.body)) {
        id = key;
        title = value;
    };

    const result = await createItem(title);
    res.status(201).json({ msg: `A post with a title of ${title} was created.` });

};

// update single post
export const updatePost = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const title = req.body.newTitle;

    const result = await updateItem(id, title);
    res.status(201).json({ msg: `A post was updated to a new title of, ${title}.` });
    
};

// delete a post
export const deletePost = async (req, res, next) => {
    const id = parseInt(req.params.id);

    const result = await deleteItem(id);
    const affectedRowCount = result[0].affectedRows;
    console.log(affectedRowCount)

    if (affectedRowCount === 0) {
        return res
            .status(404)
            .json({ msg: `A post with id of ${id} was not found.` })
    } else {
        res.status(200).json({ msg: `A post with id of ${id} was deleted.` });
    }

};
*/