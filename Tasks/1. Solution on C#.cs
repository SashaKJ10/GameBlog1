CheckPagination();

void CheckPagination()
{
    var pages = Enumerable.Range(1, 9).ToList(); // Creates an array: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    Console.WriteLine("pages: " + string.Join(", ", pages)); // Writes to console: pages: 1, 2, 3, 4, 5, 6, 7, 8, 9

    while (true)
    {
        Console.Write("page: "); // Writes to console: page: 
        var page = int.Parse(Console.ReadLine()); // Reads page number you entered
        if (page == 0)
            break;

        var result = new List<int>();

        var curPageIndex = page - 1;

        var n1 = 5;
        var n2 = n1 / 2;

        var dmin = n2;
        var dmax = n2;

        if (curPageIndex < n2)
            dmax += n2 - curPageIndex;

        if (curPageIndex >= pages.Count - n2)
            dmin += n2 - (pages.Count - curPageIndex - 1);

        for (int pageIndex = 0; pageIndex < pages.Count; pageIndex++)
        {
            if (pageIndex + dmin >= curPageIndex && pageIndex - dmax <= curPageIndex)
                result.Add(pages[pageIndex]);  // Adds value to result array
        }

        Console.WriteLine("selection: " + string.Join(", ", result)); // Writes to console: selection: {result array}
    }
}