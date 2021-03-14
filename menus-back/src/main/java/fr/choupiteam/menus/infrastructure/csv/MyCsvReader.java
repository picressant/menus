package fr.choupiteam.menus.infrastructure.csv;

import de.siegmar.fastcsv.reader.CsvParser;
import de.siegmar.fastcsv.reader.CsvReader;
import de.siegmar.fastcsv.reader.CsvRow;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.function.Consumer;

public class MyCsvReader {

    public void read(File file, Consumer<List<String>> onRow) {
        CsvReader csvReader = new CsvReader();
        csvReader.setContainsHeader(false);
        csvReader.setSkipEmptyRows(true);
        csvReader.setFieldSeparator(',');

        try (CsvParser csvParser = csvReader.parse(file, StandardCharsets.UTF_8)) {
            CsvRow row;
            while ((row = csvParser.nextRow()) != null) {
                if (!row.getField(0).startsWith("#")) {
                    onRow.accept(row.getFields());
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}

