# frozen_string_literal: true

def copy_code
  text = ''
  File.foreach 'main.rb' do |l|
    l.strip!
    text += "#{l}\n" if !l.empty? && !l.start_with?('# ')
  end
  IO.popen('pbcopy', 'w') { _1.print(text[0..-2]) }
end

puts '何をしますか？'
puts ''
puts 'テストを実行: [t]'
puts '貼り付け用コードをコピー(Macのみ): [c]'
puts '終了: [その他のキー]'
print '-> '

case gets.chomp
when 't'
  system('rspec test.rb')
when 'c'
  copy_code
  puts 'コピーしました！'
end
