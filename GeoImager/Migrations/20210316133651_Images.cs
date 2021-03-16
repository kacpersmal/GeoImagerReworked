using Microsoft.EntityFrameworkCore.Migrations;

namespace GeoImager.Migrations
{
    public partial class Images : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserProfiles_ImageModel_UserBackgroundImageId",
                table: "UserProfiles");

            migrationBuilder.DropForeignKey(
                name: "FK_UserProfiles_ImageModel_UserProfileImageId",
                table: "UserProfiles");

            migrationBuilder.DropIndex(
                name: "IX_UserProfiles_UserBackgroundImageId",
                table: "UserProfiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ImageModel",
                table: "ImageModel");

            migrationBuilder.DropColumn(
                name: "UserBackgroundImageId",
                table: "UserProfiles");

            migrationBuilder.RenameTable(
                name: "ImageModel",
                newName: "Images");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Images",
                table: "Images",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserProfiles_Images_UserProfileImageId",
                table: "UserProfiles",
                column: "UserProfileImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserProfiles_Images_UserProfileImageId",
                table: "UserProfiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Images",
                table: "Images");

            migrationBuilder.RenameTable(
                name: "Images",
                newName: "ImageModel");

            migrationBuilder.AddColumn<int>(
                name: "UserBackgroundImageId",
                table: "UserProfiles",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ImageModel",
                table: "ImageModel",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_UserBackgroundImageId",
                table: "UserProfiles",
                column: "UserBackgroundImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserProfiles_ImageModel_UserBackgroundImageId",
                table: "UserProfiles",
                column: "UserBackgroundImageId",
                principalTable: "ImageModel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserProfiles_ImageModel_UserProfileImageId",
                table: "UserProfiles",
                column: "UserProfileImageId",
                principalTable: "ImageModel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
