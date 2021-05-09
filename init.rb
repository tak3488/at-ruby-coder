# frozen_string_literal: true

require 'fileutils'

while true
  print 'フォルダ名を入力：'
  dir_name = gets.chomp
  if dir_name =~ /\A.*\s.*\Z/
    puts 'フォルダ名にスペースを入れることはできません'
  elsif Dir.glob('*').include?(dir_name)
    puts 'そのフォルダ名はすでに使われています(仕様上,大文字と小文字を区別できません)'
  else
    break
  end
  puts ''
end

Dir.mkdir(dir_name)
FileUtils.cp(%w[template/main.rb template/cli.rb template/test.txt], dir_name)

test_path = "#{dir_name}/test.txt"
buffer = File.open(test_path, 'r') { |f| f.read } # rubocop:disable Style/SymbolProc
puts 'テスト用コードを貼り付けてください(末尾に空行を入れてください／後で入力する場合はそのままEnterを押してください)'
test_code = ''
loop do
  text = gets.chomp
  break if text.empty?

  test_code += "#{text}\n"
end
unless test_code.empty?
  buffer.gsub!('  # Write the test code here.', test_code)
  File.open(test_path, 'w') { |f| f.write(buffer) }
end

File.rename("#{dir_name}/test.txt", "#{dir_name}/test.rb")

puts 'フォルダの作成が完了しました'
puts "`cd #{dir_name}' を実行してコーディングを始めましょう！"
