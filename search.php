<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Connect to the SQLite database
    $db = new SQLite3('mod.sqlite');

    // Retrieve form input
    $full_name = $_POST['full_name'];

    // Sanitize input to prevent SQL injection
    $full_name = $db->escapeString($full_name);

    // Build the SQL query
    $query = "SELECT * FROM mod WHERE P_NAME LIKE '%$full_name%'";

    // Execute the query
    $results = $db->query($query);

    // Display the search results
    while ($row = $results->fetchArray()) {
        foreach ($row as $column => $value) {
            echo "$column: $value<br>";
        }
        echo "<hr>"; // Add a separator between results
    }

    // Close the database connection
    $db->close();
}
?>
