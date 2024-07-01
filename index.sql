CREATE DATABASE notes_apps;
USE notes_apps;

CREATE TABLE notes
{
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    contents VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
};

INSERT INTO notes (title,contents) VALUES
('My First Notes','A note about something'),
('My Second Notes','A note about something else');