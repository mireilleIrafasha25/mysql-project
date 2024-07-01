import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Mugisha123@#',
    database: 'notes_apps',
}).promise();

export async function getNotes() {
    const [rows] = await pool.query('SELECT * FROM notes');
    return rows;
}

export async function getNote(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM notes
        WHERE id = ?
    `, [id]);
    return rows[0];
}
export async  function updateNote(id, title, contents) {
    const [result] = await pool.query(`
      UPDATE notes
      SET title = ?, contents = ?
      WHERE id = ?
    `, [title, contents, id]);
    return result;
  };
export async function deleteNote(id)
{
    const [result] = await pool.query(`
        DELETE FROM notes
        WHERE id = ?
    `, [id]);  
    return result; 
}
export async function createNote(title, content) {
    const [result] = await pool.query(`
        INSERT INTO notes (title, contents)
        VALUES (?, ?)
    `, [title, content]);
    const id=result.insertId;

    return getNote(id);
}

async function main() {
    try {
        //const newNote = await createNote('My New Note', 'This is the content of my new note.');
        //console.log(newNote);
    } catch (err) {
        console.error(err);
    }
}

main();
