/*
Model l�tez�s�nek ellen�rz�s�re.
*/

function requireOption(objectRepository, propertyName) {
    if (objectRepository && objectRepository[propertyName]) {
        return objectRepository[propertyName];
    }
    throw new TypeError(propertyName + "required");
}

module.exports = requireOption;