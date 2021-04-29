export const files = [
    {
        id: 1,
        filename: 'testfile1',
        filetype: 'pdf',
        filesize: 123,
        downloadUrl: 'google.pl',
        folder: null,
        owner: 'testuser',
        createdAt: new Date()
    },
    {
        id: 2,
        filename: 'testfile2',
        filetype: 'pdf',
        filesize: 123456,
        downloadUrl: 'google.pl',
        folder: 1,
        owner: 'testuser',
        createdAt: new Date()
    },
    {
        id: 3,
        filename: 'testfile3',
        filetype: 'pdf',
        filesize: 12321,
        downloadUrl: 'google.pl',
        folder: 1,
        owner: 'testuser',
        createdAt: new Date()
    },
    {
        id: 4,
        filename: 'testfile4',
        filetype: 'pdf',
        filesize: 1232324,
        downloadUrl: 'google.pl',
        folder: 2,
        owner: 'testuser',
        createdAt: new Date()
    },
];

export const folders = [
    {
        id: 1,
        color: 'red',
        name: 'documents'
    },
    {
        id: 2,
        color: 'green',
        name: 'images'
    },
];