USE experimental;

CREATE OR ALTER PROCEDURE getProduct(
    @id VARCHAR(255)
)
AS 
BEGIN
SELECT * FROM products WHERE id=@id
END
GO