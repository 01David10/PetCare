const connection = require('../../db')

function login(req, res) {
    const { email, password } = req.body;
    console.log(email + password)

    const query = `
        SELECT *, 'pet_owner' AS source_table FROM pet_owner WHERE email = ? AND password = ?
        UNION ALL
        SELECT *, 'veterinarian' AS source_table FROM veterinarian WHERE email = ? AND password = ?
        UNION ALL
        SELECT *, 'clinic_administrator' AS source_table FROM clinic_administrator WHERE email = ? AND password = ?
    `;

    connection.query(query, [email, password, email, password, email, password], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al iniciar sesión');
        } else if (results.length > 0) {
            const user = results[0];
            console.log('Usuario encontrado:', user);

            const tableName = user.source_table;

            if (tableName === 'pet_owner') {
                console.log("dueñomascota");
                res.redirect('/home');
            } else if (tableName === 'veterinarian') {
                console.log("veterinario");
                res.redirect('/veterinarian');
            } else if (tableName === 'clinic_administrator') {
                console.log("admin");
                res.redirect('/admin');
            } else {
                console.error('Usuario encontrado en una tabla desconocida');
                res.status(400).send('Error de autenticación');
            }
        } else {
            // Credenciales inválidas
            res.status(401).send('Credenciales inválidas');
        }
    });
}

module.exports = {
    login
};