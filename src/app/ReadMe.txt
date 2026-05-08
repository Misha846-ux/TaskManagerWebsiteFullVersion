The components are located here and are clearly sorted.
The component with the name "GlobalPage" at the root is 
the main component on top of which everything else is built.
Here is the sorting priority:
    1) If the component is a field (pop-up window) for entering data to 
        create/add/delete/update/output data, it is sent to the "Windows" folder
    2) If a component is common to all pages that are accessible to an authorized user 
        (sidebar, header, NOT calendar...), it is sent to the "GeneralComponents" folder.
    3) If you're going to create a new page, you first need to create a folder with the 
        page's name in the "Pages" folder. Then, within that folder, create a tsx file 
        that will be the page itself. Then, break the page down into components and create 
        folders within which you'll describe the necessary components. 
        (For a better understanding, see how this is already implemented.)
    4) The unique content of a page is located in the page's folder in the "components" folder.
    5) Components used in multiple pages are located in the "MultiUsedParts" folder.
    6) Styles are also sent to their own folder and sorted in the same way as components.
