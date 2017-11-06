/* version: 201711051818_add-dates */

-- Table of food intake records
CREATE TABLE records (
  date      timestamp,
  food      varchar(80)
);

-- Table of reports of symptoms to compare with the records
CREATE TABLE reports (
  date      timestamp,
  symptom   varchar(80)
);
