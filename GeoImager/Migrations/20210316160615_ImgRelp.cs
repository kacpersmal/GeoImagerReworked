using Microsoft.EntityFrameworkCore.Migrations;

namespace GeoImager.Migrations
{
    public partial class ImgRelp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RelPath",
                table: "Images",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RelPath",
                table: "Images");
        }
    }
}
