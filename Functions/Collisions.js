function collideBetween(cube1, cube2) {
    for (let x = cube1.min.x; x <= cube1.max.x; x++)
        for (let y = cube1.min.y; y <= cube1.max.y; y++)
            for (let z = cube1.min.z; z <= cube1.max.z; z++)
                if (x <= cube2.max.x && x >= cube2.min.x
                    && y <= cube2.max.y && y >= cube2.min.y
                    && z <= cube2.max.z && z >= cube2.min.z)
                        return (true);
    return (false);
}