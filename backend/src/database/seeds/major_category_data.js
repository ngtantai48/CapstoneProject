/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("major_category").del();
	await knex("major_category").insert([
		{
			id: 1,
			title: 'Y học'
		},
		{
			id: 2,
			title: 'Quản trị'
		},
		{
			id: 3,
			title: 'Công nghệ thông tin'
		},
		{
			id: 4,
			title: 'Sư phạm'
		},
		{
			id: 5,
			title: 'Ngôn ngữ Anh'
		},
		{
			id: 6,
			title: 'Ngôn ngữ Nga'
		},
		{
			id: 7,
			title: 'Ngôn ngữ Pháp'
		},
		{
			id: 8,
			title: 'Ngôn ngữ Trung Quốc'
		},
		{
			id: 9,
			title: 'Ngôn ngữ Nhật'
		},
		{
			id: 10,
			title: 'Ngôn ngữ Hàn Quốc'
		},
		{
			id: 11,
			title: 'Ngôn ngữ Thái Lan'
		},
		{
			id: 12,
			title: 'Khoa học xã hội'
		},
		{
			id: 13,
			title: 'Tài chính'
		},
		{
			id: 14,
			title: 'Luật'
		},
		{
			id: 15,
			title: 'Công nghệ sinh học'
		},
		{
			id: 16,
			title: 'Xây dựng'
		},
		{
			id: 17,
			title: 'Du lịch'
		},
		{
			id: 18,
			title: 'Khoa học y sinh'
		},
		{
			id: 19,
			title: 'Công nghệ nano'
		},
		{
			id: 20,
			title: 'Maketing'
		},
		{
			id: 21,
			title: 'Kế toán'
		},
		{
			id: 22,
			title: 'Khoa học dữ liệu'
		},
		{
			id: 23,
			title: 'Kinh tế'
		},
		{
			id: 24,
			title: 'Chương trình chính quy quốc tế'
		},
		{
			id: 25,
			title: 'Hóa học'
		},
		{
			id: 26,
			title: 'Báo chí'
		},
		{
			id: 27,
			title: 'Xã hội'
		},
		{
			id: 28,
			title: 'Quản lý tài nguyên và môi trường'
		},
		{
			id: 29,
			title: 'Tâm lý học'
		},
		{
			id: 30,
			title: 'Cơ khí'
		},
		{
			id: 31,
			title: 'Cơ điện tử'
		},
		{
			id: 32,
			title: 'Kỹ thuật ô tô'
		},
		{
			id: 33,
			title: 'Kỹ thuật nhiệt'
		},
		{
			id: 34,
			title: 'Điện tử viễn thông'
		},
		{
			id: 35,
			title: 'Tự động hóa'
		},
		{
			id: 36,
			title: 'Môi trường'
		},
		{
			id: 37,
			title: 'Kỹ thuật thực phẩm'
		},
		{
			id: 38,
			title: 'Kiến trúc'
		},
		{
			id: 39,
			title: 'Chế tạo máy'
		},
		{
			id: 40,
			title: 'Dầu khí'
		},
		{
			id: 41,
			title: 'Kỹ thuật tàu thủy'
		},
		{
			id: 42,
			title: 'Kỹ thuật điện'
		},
		{
			id: 43,
			title: 'Công nghệ thực phẩm'
		},
		{
			id: 44,
			title: 'Hệ thống công nghiệp'
		},
		{
			id: 45,
			title: 'Hệ thống nhúng'
		},
		{
			id: 46,
			title: 'Chương trình cử nhân chính quy quốc tế'
		},
		{
			id: 47,
			title: 'Y sinh'
		},
		{
			id: 48,
			title: 'Vật lý'
		},
	])
};
